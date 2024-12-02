namespace GAAP_2024.Models.DTO
{
    public class PhoneDTO
    {
        public int IdUser { get; set; }
        public int PhoneNumber {  get; set; }
        public string? AreaCode { get; set; }
        public byte Status { get; set; }
    }
}
