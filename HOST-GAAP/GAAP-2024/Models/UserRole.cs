using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GAAP_2024.Models;

[Table("UserRole")]
public partial class UserRole
{
    [Key]
    public int Id { get; set; }
    public int IdRole { get; set; }
    public int IdUser { get; set; }

    /// <summary>
    /// 1 = Activo 
    /// 0 = Eliminado
    /// 
    /// </summary>
    public byte Status { get; set; }
    public DateTime RegisterDate { get; set; }
    public DateTime UpdateDate { get; set; }

    [NotMapped]
    public Role? IdRoleNavigation { get; set; }

    [NotMapped]
    public User? IdUserNavigation { get; set; }
}
