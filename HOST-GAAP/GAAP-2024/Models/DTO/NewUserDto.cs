namespace GAAP_2024.Models.DTO
{
    public class NewUserDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string UserSede { get; set; }
        public int IdRole { get; set; }
        public string? userRol { get; set; }
    }
}
