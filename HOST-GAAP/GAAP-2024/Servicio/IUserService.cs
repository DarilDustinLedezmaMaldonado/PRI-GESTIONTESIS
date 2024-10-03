// IUserService.cs
using System.Threading.Tasks;
using GAAP_2024.Models;

namespace GAAP_2024.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        Task<Role> SearchRole(int idUser);
        Task<List<User>> GetUsersByRole(int roleId);
        Task<List<User>> GetUsersByProject(string projectId);
        Task AddUsersToProject(string projectId, List<int> userIds);
        Task<bool> IsStudentInAnotherProject(int userId);
    }
}
