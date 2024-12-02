using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GAAP_2024.Models;

[Table("Stage")]
public partial class Stage
{
    [Key]
    public int Id { get; set; }
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
    [NotMapped]
    public Project? IdProjectNavigation { get; set; }

    [NotMapped]
    public List<Substage>? Substages { get; set; }
}
