using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GAAP_2024.Data;
using GAAP_2024.Models;
using GAAP_2024.Models.DTO;

namespace GAAP_2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObservationsController : ControllerBase
    {
        private readonly Gaap2024Context _context;

        public ObservationsController(Gaap2024Context context)
        {
            _context = context;
        }

        // GET: api/Observations
        [HttpGet("ObtenerObservaciones")]
        public async Task<ActionResult<IEnumerable<Observation>>> GetObservations()
        {
            var res = await _context.Observations.ToListAsync();

            return res;
        }

        // GET: api/Observations/5
        [HttpGet("ObtenerObservacion{id}")]
        public async Task<ActionResult<Observation>> GetObservation(int id)
        {
            var observation = await _context.Observations.FindAsync(id);

            if (observation == null)
            {
                return NotFound();
            }

            return observation;
        }

        // PUT: api/Observations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("ActualizarObservation{id}")]
        public async Task<IActionResult> PutObservation(int id, ObservationDTO observationdto)
        {
            var observation = await _context.Observations.FindAsync(id);
            if (!ObservationExists(id))
            {
                return NotFound() ;
            }

            if(observation == null)
            {
                return BadRequest();
            }
            observation.IdSubstage = observationdto.IdSubstage;
            observation.Comentary = observationdto.Commentary!;
            observation.Type = observationdto.Type!;
            observation.Status = observationdto.Status!;
            observation.UpdateDate = DateTime.Now;

            _context.Entry(observation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ObservationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Observations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("InsertarObservation")]
        public async Task<ActionResult<Observation>> PostObservation(ObservationDTO observationdto)
        {
            Observation observation = new Observation()
            {
                IdSubstage = observationdto.IdSubstage,
                Comentary = observationdto.Commentary!,
                Status = observationdto.Status,
                Type = observationdto.Type!,
                RegisterDate = DateTime.Now,
                UpdateDate = DateTime.Now,
            };
            _context.Observations.Add(observation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetObservation", new { id = observation.Id }, observation);
        }

        // DELETE: api/Observations/5
        [HttpDelete("Eliminar{id}")]
        public async Task<IActionResult> DeleteObservation(int id)
        {
            var observation = await _context.Observations.FindAsync(id);
            if (observation == null)
            {
                return NotFound();
            }

            observation.Status = 0;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ObservationExists(int id)
        {
            return _context.Observations.Any(e => e.Id == id);
        }
    }
}
