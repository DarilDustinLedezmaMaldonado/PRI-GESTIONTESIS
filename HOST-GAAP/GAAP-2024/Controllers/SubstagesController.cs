using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GAAP_2024.Data;
using GAAP_2024.Models;

namespace GAAP_2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubstagesController : ControllerBase
    {
        private readonly Gaap2024Context _context;

        public SubstagesController(Gaap2024Context context)
        {
            _context = context;
        }

        //Para obtener las etapas
        [HttpGet("GetAllStages")]
        public async Task<ActionResult<IEnumerable<Stage>>> GetStages()
        {
            return await _context.Stages.Where(x => x.Status == 1).ToListAsync();
        }
        // Para obtener todas las subetapas
        [HttpGet("GetAllSubstages")]
        public async Task<ActionResult<IEnumerable<Substage>>> GetSubstages()
        {
            return await _context.Substages.Where(x => x.Status == 1).ToListAsync();
        }
        // PUT: api/Substages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPut("CambiarEstadoSubstage{idStage}")]
        public async Task<IActionResult> ChangeStatusSubStage(int idStage)
        {
            var substages = await _context.Substages.Where(x => x.IdStage == idStage)
                                                    .ToListAsync();
            /*
             * 1 = Activo 
            2 = Finalizada 
            3 = En Espera 
            0 = Eliminado 
            */
            if (substages != null)
            {
                int stagesCount = substages.Count;
                for (int i = 0; i < stagesCount; i++)
                {
                    if (substages[i].SubstageNumber == 1)
                    {
                        substages[i].Status = 2;
                    }
                    else if (substages[i].SubstageNumber == 2)
                    {
                        substages[i].Status = 1;
                    }
                    else
                    {
                        substages[i].Status = 3;
                    }
                }
            }
            await _context.SaveChangesAsync();


            return Ok(substages);
        }
        [HttpPut("AcceptSubstage/{idStage}/{idSubstage}")]
        public async Task<IActionResult> AcceptSubStage(int idStage, int idSubstage)
        {
            // Buscar la subetapa específica
            var substage = await _context.Substages
                                         .FirstOrDefaultAsync(x => x.IdStage == idStage && x.Id == idSubstage);

            if (substage == null)
            {
                return NotFound("No se encontró la subetapa especificada.");
            }

            // Cambiar estado automáticamente a 'Finalizado' (2)
            substage.Status = 1;
            await _context.SaveChangesAsync();

            return Ok(substage);
        }
        [HttpPut("DeclineSubstage/{idStage}/{idSubstage}")]
        public async Task<IActionResult> DeclineSubStage(int idStage, int idSubstage)
        {
            // Buscar la subetapa específica
            var substage = await _context.Substages
                                         .FirstOrDefaultAsync(x => x.IdStage == idStage && x.Id == idSubstage);

            if (substage == null)
            {
                return NotFound("No se encontró la subetapa especificada.");
            }

            // Cambiar estado automáticamente a 'Finalizado' (2)
            substage.Status = 2;
            await _context.SaveChangesAsync();

            return Ok(substage);
        }

        [HttpPatch("RegresarSubstage{stageId}")]
        public async Task<ActionResult<Substage>> BackSubStage(int stageId)
        {
            var substages = await _context.Substages.Where(x => x.IdStage == stageId)
                                                    .ToListAsync();

            Substage substage1 = null!;

            if (substages != null)
            {
                foreach (Substage substage in substages)
                {
                    if (substage.DesignatedRole != 2)
                    {
                        substage.Status = 3;
                    }
                    else
                    {
                        substage.Status = 1;
                        substage1 = substage;
                    }
                }
            }
            await _context.SaveChangesAsync();
            return substage1 == null ? NoContent() : substage1;
        }

    }
}
