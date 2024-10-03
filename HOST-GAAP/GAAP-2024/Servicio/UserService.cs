// UserService.cs
using System.Threading.Tasks;
using GAAP_2024.Data;
using GAAP_2024.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace GAAP_2024.Services
{
    public class UserService : IUserService
    {
        private readonly Gaap2024Context _context;

        public UserService(Gaap2024Context context)
        {
            _context = context;
        }

        public async Task<User> Authenticate(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username && u.Password == password);

            return user;
        }
        public async Task<Role> SearchRole(int idUser)
        {
            var role = await (from ur in _context.UserRoles
                              join r in _context.Roles on ur.IdRole equals r.Id
                              where ur.IdUser == idUser
                              select r).FirstOrDefaultAsync();

            return role;
        }

        public async Task<List<User>> GetUsersByRole(int roleId)
        {
            var users = await (from u in _context.Users
                               join ur in _context.UserRoles on u.Id equals ur.IdUser
                               where ur.IdRole == roleId && ur.Status == 1
                               select u).ToListAsync();

            return users;
        }

        public async Task<List<User>> GetUsersByProject(string projectId)
        {
            var users = await (from u in _context.Users
                               join up in _context.UserProjects on u.Id equals up.IdUser
                               where up.IdProject == projectId && up.Status == 1
                               select u).ToListAsync();

            return users;
        }

        public async Task AddUsersToProject(string projectId, List<int> userIds)
        {
            var now = DateTime.Now;
            var tasks = new List<Task>();

            foreach (var userId in userIds)
            {
                var role = await SearchRole(userId);
                var sql = @"
                INSERT INTO UserProject (IdUser, IdProject, IdRole, Status, RegisterDate, UpdateDate)
                VALUES (@IdUser, @IdProject, @IdRole, @Status, @RegisterDate, @UpdateDate)";

                var parameters = new[]
                {
                    new SqlParameter("@IdUser", userId),
                    new SqlParameter("@IdProject", projectId),
                    new SqlParameter("@IdRole", role.Id),
                    new SqlParameter("@Status", 1),
                    new SqlParameter("@RegisterDate", now),
                    new SqlParameter("@UpdateDate", now)
                };

                tasks.Add(_context.Database.ExecuteSqlRawAsync(sql, parameters));
            }

            await Task.WhenAll(tasks);
        }

        public async Task<bool> IsStudentInAnotherProject(int userId)
        {
            var isInProject = await (from up in _context.UserProjects
                                     join ur in _context.UserRoles on up.IdUser equals ur.IdUser
                                     join r in _context.Roles on ur.IdRole equals r.Id
                                     where up.IdUser == userId && r.RolDescription == "estudiante" && up.Status == 1
                                     select up).AnyAsync();

            return isInProject;
        }


    }
}
