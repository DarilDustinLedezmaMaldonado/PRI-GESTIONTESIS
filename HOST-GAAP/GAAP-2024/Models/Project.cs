using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GAAP_2024.Models;

[Table("Project")]
public partial class Project
{
    [Key]
    public string Id { get; set; }

    /// <summary>
    /// T=tesis
    /// D=trabajo dirigido
    /// P=proyecto de grado
    /// </summary>
    public string ProjectModality { get; set; } 
    public string ProjectTittle { get; set; }
    public string ProjectGeneralObjetive { get; set; }
    public string ProjectSpecificObjectives { get; set; }
    public string ProjectScope { get; set; }
    public string ProjectQueryDocument { get; set; } 

    /// <summary>
    /// 1 = Activo 
    /// 2= Rechazado  
    /// 3 = Finalizado 
    /// 0 = Eliminado
    /// 
    /// </summary>
    public byte Status { get; set; }
    public byte ProjectReviewsNumber { get; set; }
    public DateTime RegisterDate { get; set; }
    public DateTime UpdateDate { get; set; }

    [NotMapped]
    public List<Stage>? Stages { get; set; } 
    [NotMapped]
    public List<UserProject>? UserProjects { get; set; }
}
