using System.ComponentModel.DataAnnotations;

namespace GAAP_2024.Models.Fix
{
    public class StageFix
    {
        [Key]
        public int Id { get; set; }

        [StringLength(20)]
        public string? IdProject { get; set; }
        public byte StageNumber { get; set; }
        public DateTime StageStartDate { get; set; }
        public DateTime StageDefinedDate { get; set; }
        public DateTime StageEndDate { get; set; }

        /// <summary>
        /// 1 = Activo 
        /// 0 = Eliminado
        /// 
        /// </summary>
        public byte Status { get; set; }
        public DateTime RegisterDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
