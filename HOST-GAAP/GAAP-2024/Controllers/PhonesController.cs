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
    public class PhonesController : ControllerBase
    {
        private readonly Gaap2024Context _context;

        public PhonesController(Gaap2024Context context)
        {
            _context = context;
        }

        // GET: api/Phones
        [HttpGet("ObtenerPhones")]
        public async Task<ActionResult<IEnumerable<Phone>>> GetPhones()
        {
            return await _context.Phones.ToListAsync();
        }

        // GET: api/Phones/5
        [HttpGet("ObtenerPhone{id}")]
        public async Task<ActionResult<Phone>> GetPhone(int id)
        {
            var phone = await _context.Phones.FindAsync(id);

            if (phone == null)
            {
                return NotFound();
            }

            return phone;
        }

        // PUT: api/Phones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("ActualizarPhone{id}")]
        public async Task<IActionResult> PutPhone(int id, PhoneDTO phoneDTO)
        {
            var phone = await _context.Phones.FindAsync(id);

            if (!PhoneExists(id))
            {
                return NotFound();
            }
            if(phone == null)
            {
                return BadRequest();
            }

            phone.IdUser = phoneDTO.IdUser;
            phone.PhoneNumber = phoneDTO.PhoneNumber;
            phone.AreaCode = phoneDTO.AreaCode!;
            phone.Status = phoneDTO.Status;
            phone.UpdateDate = DateTime.Now;

            _context.Entry(phone).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhoneExists(id))
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

        // POST: api/Phones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("InsertarPhone")]
        public async Task<ActionResult<Phone>> PostPhone(PhoneDTO phoneDTO)
        {
            Phone phone = new Phone
            {
                IdUser = phoneDTO.IdUser,
                PhoneNumber = phoneDTO.PhoneNumber,
                AreaCode = phoneDTO.AreaCode!,
                Status = phoneDTO.Status,
                RegisterDate = DateTime.Now,
                UpdateDate = DateTime.Now
            };
            _context.Phones.Add(phone);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhone", new { id = phone.Id }, phone);
        }

        // DELETE: api/Phones/5
        [HttpDelete("EliminarPhone{id}")]
        public async Task<IActionResult> DeletePhone(int id)
        {
            var phone = await _context.Phones.FindAsync(id);
            if (phone == null)
            {
                return NotFound();
            }

            phone.Status = 0;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PhoneExists(int id)
        {
            return _context.Phones.Any(e => e.Id == id);
        }
    }
}
