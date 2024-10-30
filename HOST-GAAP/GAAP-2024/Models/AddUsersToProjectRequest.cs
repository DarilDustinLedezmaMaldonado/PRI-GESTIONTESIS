namespace GAAP_2024.Models
{
    public class AddUsersToProjectRequest
    {
        public string ProjectId { get; set; }
        public List<int> UserIds { get; set; }
    }
}
