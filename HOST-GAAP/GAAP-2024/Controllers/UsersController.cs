using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Azure.Core;
using GAAP_2024.Data;
using GAAP_2024.Models;
using GAAP_2024.Models.DTO;
using GAAP_2024.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace GAAP_2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly Gaap2024Context _context;
        private readonly IConfiguration _configuration;

        public UsersController(IUserService userService, Gaap2024Context context, IConfiguration configuration)
        {
            _userService = userService;
            _context = context;
            _configuration = configuration;
        }

        [HttpGet("GetAllUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.Where(x => x.Status == 1).ToListAsync();
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login([FromBody] LoginViewModel loginModel)
        {
            // Busca al usuario en la base de datos por nombre de usuario y estado activo
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == loginModel.UserName && u.Status == 1);

            // Verifica que el usuario existe y la contraseña es correcta
            if (user == null || user.Password != loginModel.Password)
            {
                return Unauthorized("Nombre de usuario o contraseña incorrectos.");
            }

            // Genera el token JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:SecretKey"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("UserName", user.FullName.ToString()),
                    new Claim("UserId", user.Id.ToString()),
                    new Claim("Role", user.userRol.ToString()) // Puedes agregar más claims si es necesario
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Devuelve el token en la respuesta
            return Ok(new { token = tokenString });
        }

        [HttpGet("ByRole/{roleId}")]
        public async Task<ActionResult<List<User>>> GetUsersByRole(int roleId)
        {
            var users = await _userService.GetUsersByRole(roleId);
            if (users == null || users.Count == 0)
            {
                return NotFound();
            }

            return Ok(users);
        }

        [HttpGet("ByProject/{projectId}")]
        public async Task<ActionResult<List<User>>> GetUsersByProject(string projectId)
        {
            var users = await _userService.GetUsersByProject(projectId);
            if (users == null || users.Count == 0)
            {
                return NotFound();
            }

            return Ok(users);
        }

        [HttpPost("AddToProject")]
        public async Task<ActionResult> AddUsersToProject(string projectId, List<int> userIds)
        {
            foreach (var userId in userIds)
            {
                if (await _userService.IsStudentInAnotherProject(userId))
                {
                    return BadRequest($"El Estudiante con ID {userId} ya está en otro proyecto.");
                }
            }
            await _userService.AddUsersToProject(projectId, userIds);
            return Ok("Usuarios añadidos al proyecto con éxito.");
        }

        [HttpPost("CreateUser")]
        public async Task<int> CreateUser([FromBody] NewUserDto req)
        {
            var outputParam = new SqlParameter
            {
                ParameterName = "@numInserciones",
                SqlDbType = System.Data.SqlDbType.Int,
                Direction = System.Data.ParameterDirection.Output
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC [dbo].[uspCreateUser] @userName," +
                " @password, @fullName,@userSede, @idRole, @userRol ,@numInserciones OUTPUT",
                new SqlParameter("@userName", req.UserName),
                new SqlParameter("@password", req.Password),        
                new SqlParameter("@fullName", req.FullName),
                new SqlParameter("@userSede", req.UserSede),
                new SqlParameter("@idRole", req.IdRole),
                new SqlParameter("@userRol", req.userRol),
                outputParam);

            return (int)outputParam.Value;
        }

        [HttpGet("GetAllRoles")]
        public async Task<ActionResult<IEnumerable<Role>>> GetAllRoles()
        {
            var roles = await _context.Roles
                .Where(r => r.Status == 1)
                .ToListAsync();

            if (roles == null || roles.Count == 0)
            {
                return NotFound("No se encontraron roles.");
            }

            return Ok(roles);
        }

        [HttpDelete("DeleteUser/{userId}")]
        public async Task<ActionResult> DeleteUser(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("Usuario no encontrado.");
            }

            user.Status = 0;

            await _context.SaveChangesAsync();
            return Ok("Usuario eliminado exitosamente.");
        }

        [HttpPost("CreateUserRole")]
        public async Task<IActionResult> CreateUserRole(UserRole userRole)
        {
            try
            {
                userRole.RegisterDate = DateTime.Now;
                userRole.UpdateDate = DateTime.Now;
                userRole.Status = 1;

                _context.UserRoles.Add(userRole);
                await _context.SaveChangesAsync();

                return Ok(userRole);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al crear el rol del usuario.", error = ex.Message });
            }
        }
    }
}
