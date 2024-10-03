using System.ComponentModel.DataAnnotations;

namespace GAAP_2024.Models.Fix
{
    public class SubStageFix
    {
        [Key]
        public int Id { get; set; }
        public int? IdStage { get; set; }

        [StringLength(20)]
        public int UserSignature { get; set; }
        public int DesignatedRole { get; set; }
        public byte SubstageNumber { get; set; }
        public DateTime SubstageStartDate { get; set; }
        public DateTime SubstageDefinedDate { get; set; }
        public DateTime SubstageEndDate { get; set; }

        /// <summary>
        /// 1 = Activo 
        /// 2 = Finalizada 
        /// 3 = En Espera 
        /// 0 = Eliminado 
        /// 
        /// </summary>
        public byte Status { get; set; }
        public DateTime RegisterDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
