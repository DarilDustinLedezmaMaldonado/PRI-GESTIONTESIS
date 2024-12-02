using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GAAP_2024.Models;

[Table("User")]
public partial class User
{
    [Key]
    public int Id { get; set; }
    public string? UserName { get; set; }
    public string? Password { get; set; }
    public string FullName { get; set; }
    public string UserSede { get; set; }
    public string? userRol {  get; set; }

    /// <summary>
    /// 1 = Activo 
    /// 0 = Eliminado
    /// 
    /// </summary>
    public byte Status { get; set; }
    public DateTime RegisterDate { get; set; }
    public DateTime UpdateDate { get; set; }


    [NotMapped]
    public List<Phone>? Phones { get; set; }

    [NotMapped]
    public List<UserProject>? UserProjects { get; set; }

    [NotMapped]
    public List<UserRole>? UserRoles { get; set; }
}
