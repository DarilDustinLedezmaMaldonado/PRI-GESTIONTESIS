using Azure.Core;
using GAAP_2024.Data;
using GAAP_2024.Models;
using GAAP_2024.Models.DTO;
using GAAP_2024.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace GAAP_2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly Gaap2024Context _context;

        public UsersController(IUserService userService, Gaap2024Context context)
        {
            _userService = userService;
            _context = context;
        }
        //Para obtener todos los usuarios sin necesidad de especificar id del proyecto
        [HttpGet("GetAllUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.Where(x => x.Status == 1).ToListAsync();
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
                " @password, @fullName, @userSede, @idRole, @numInserciones OUTPUT",
                new SqlParameter("@userName", req.UserName),
                new SqlParameter("@password", req.Password),
                new SqlParameter("@fullName", req.FullName),
                new SqlParameter("@userSede", req.UserSede),
                new SqlParameter("@idRole", req.IdRole),
                outputParam);

            return (int)outputParam.Value;
        }

    }

}
