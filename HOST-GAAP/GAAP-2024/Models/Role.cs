using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GAAP_2024.Models;

[Table("Role")]
public partial class Role
{
    [Key]
    public int Id { get; set; }
    public string RolDescription { get; set; }

    /// <summary>
    /// 1 = Activo 
    /// 0 = Eliminado
    /// 
    /// </summary>
    public byte Status { get; set; }
    public DateTime RegisterDate { get; set; }
    public DateTime UpdateDate { get; set; }

    [NotMapped]
    public List<UserProject>? UserProjects { get; set; }

    [NotMapped]
    public List<UserRole>? UserRoles { get; set; }
}
