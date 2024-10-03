using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GAAP_2024.Models;

[Table("Phone")]
public partial class Phone
{
    [Key]
    public int Id { get; set; }
    public int IdUser { get; set; }
    public int PhoneNumber { get; set; }
    public string AreaCode { get; set; }

    /// <summary>
    /// 1 = Activo 
    /// 0 = Eliminado
    /// 
    /// </summary>
    public byte Status { get; set; }
    public DateTime RegisterDate { get; set; }
    public DateTime UpdateDate { get; set; }
    [NotMapped]
    public User? IdUserNavigation { get; set; }
}
