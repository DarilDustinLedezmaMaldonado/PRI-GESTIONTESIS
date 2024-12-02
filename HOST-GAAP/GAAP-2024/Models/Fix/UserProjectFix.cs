using System.ComponentModel.DataAnnotations;

namespace GAAP_2024.Models.Fix
{
    public class UserProjectFix
    {
        [Key]
        public int Id { get; set; }
        public int? IdUser { get; set; }

        [StringLength(20)]
        public string IdProject { get; set; }
        public int? IdRole { get; set; }

        /// <summary>
        /// A = Activo
        /// E = Espera
        /// P =Pausa
        /// </summary>
        //[StringLength(1)]
        //public string ProjectUserStatus { get; set; }

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
