using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GAAP_2024.Models;

[Table("Observation")]
public partial class Observation
{
    [Key]
    public int Id { get; set; }
    public int IdSubstage { get; set; }
    public string Comentary { get; set; }

    /// <summary>
    /// O=Observacion de fondo
    /// A=Observacion de forma
    /// 
    /// </summary>
    public string Type { get; set; }

    /// <summary>
    /// 1 = Activo 
    /// 2 = Revisado 
    /// 3 = Corregido 
    /// 0 = Eliminado
    /// 
    /// </summary>
    public byte Status { get; set; }
    public DateTime RegisterDate { get; set; }
    public DateTime UpdateDate { get; set; }

    [NotMapped]
    public Substage? IdSubstageNavigation { get; set; }
}
