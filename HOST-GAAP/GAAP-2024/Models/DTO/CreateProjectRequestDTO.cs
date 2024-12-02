namespace GAAP_2024.Models.DTO
{
    public class CreateProjectRequestDTO
    {
        public string ProjectID { get; set; }
        public char Modality { get; set; }
        public int RegisterUser { get; set; }
        public int ESUser { get; set; }
        public int TUUser { get; set; }
    }
}
