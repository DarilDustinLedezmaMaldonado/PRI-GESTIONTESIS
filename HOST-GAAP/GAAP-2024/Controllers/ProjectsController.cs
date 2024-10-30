using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GAAP_2024.Models.DTO;
using GAAP_2024.Data;
using GAAP_2024.Models;
using GAAP_2024.Models.Fix;

namespace GAAP_2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly Gaap2024Context _context;

        public ProjectsController(Gaap2024Context context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet("GetAllProyects")]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return await _context.Projects.Where(x => x.Status == 1).ToListAsync();
        }

        // GET: api/Projects/5
        [HttpGet("getProyectByID/{id}")]
        public async Task<ActionResult<Project>> GetProject(string id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return project;
        }

        [HttpGet("GetStageByProjectID/{idProject}")]
        public async Task<ActionResult<IEnumerable<StageFix>>> GetStages(string idProject)
        {
            try
            {
                //var hy = await _context.Stages.ToListAsync();

                //var stages = await _context.Stages.Where(s => s.IdProject == idProject).ToListAsync();
                //if (stages == null)
                //{
                //    return NotFound();
                //}
                var re = _context.GetStageByIdProject(idProject).ToList();
                return re;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        //OBTENER EL SUBSTAGE DE UNA ETAPA

        [HttpGet("GetSubstageOfStageID/{idStage}")]
        public async Task<ActionResult<IEnumerable<SubStageFix>>> GetSubStages(int idStage)
        {
            try
            {
                //var substages = await _context.Substages.Where(s => s.IdStage == idStage).ToListAsync();
                //if (substages == null)
                //{
                //    return NotFound();
                //}
                //return substages;
                var re = _context.GetSubStageByIdStage(idStage).ToList();
                return re;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }


        //OBTENER LOS PROYECTOS DE UN USUARIO
        // GET: api/Projects/5
        [HttpGet("GetProjectsByUserID/{id}")]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjectsByUser(int id)
        {

            try
            {
                //var project = await _context.Projects.Where(x=> x.Id == id).Where(c=>c.);
                //obtener los proyectos de un usuario
                var IdProjects = _context.GetUserProjectByIdUser(id).ToList();

                if (IdProjects == null)
                {
                    return NotFound();
                }
                //var projects = new List<Project>();
                //foreach (var item in IdProjects)
                //{
                //    var project = await _context.Projects.FindAsync(item.IdProject);
                //    projects.Add(project);
                //}

                //if (projects == null)
                //{
                //    return NotFound();
                //}

                return IdProjects;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }


        //ACTUALIZAR UN PROYECTO
        // PUT: api/Projects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateProjectByID/{id}")]
        public async Task<IActionResult> PutProject(string id, UpdateProjectDTO updateProjectDto)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            project.ProjectModality = updateProjectDto.ProjectModality;
            project.ProjectTittle = updateProjectDto.ProjectTittle;
            project.ProjectGeneralObjetive = updateProjectDto.ProjectGeneralObjetive;
            project.ProjectSpecificObjectives = updateProjectDto.ProjectSpecificObjectives;
            project.ProjectScope = updateProjectDto.ProjectScope;
            project.ProjectQueryDocument = updateProjectDto.ProjectQueryDocument;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
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







        //ACTUALIZAR UN SUBSTAGE A FINALIZADO

        [HttpPut("SubstageEndedById/{id}")]
        public async Task<IActionResult> PutProjectDate(int id, int idUser)
        {
            var substage = await _context.Substages.FindAsync(id);
            if (substage == null)
            {
                return NotFound();
            }

            substage.UserSignature = idUser;
            substage.Status = 2;
            substage.UpdateDate = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id.ToString()))
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

        // POST: api/Projects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("CreateAProjects")]
        public async Task<ActionResult> PostProject(CreateProjectRequestDTO request)
        {
            try
            {
                int insertedRecords = await _context.ExecuteUspCreateProjectAsync(
                    request.ProjectID,
                    request.Modality,
                    request.RegisterUser,
                    request.ESUser,
                    request.TUUser);

                return Ok(new { InsertedRecords = insertedRecords });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        // DELETE: api/Projects/5
        [HttpDelete("DeleteProjectByID/{id}")]
        public async Task<IActionResult> DeleteProject(string id)
        {
            try
            {
                var project = await _context.Projects.FindAsync(id);
                if (project == null)
                {
                    return NotFound();
                }

                await _context.DeleteProjectAsync(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        private bool ProjectExists(string id)
        {
            return _context.Projects.Any(e => e.Id == id);
        }

        //ACTUALIZAR ESTADO DE SUBSTAGE DE UNA ETAPA ACTIVA DADO EL ID DE UN PROYECTO

        [HttpPut("CloseAndBeginAsubsTage/{id}")]
        public async Task<IActionResult> PutStages(string id)
        {
            try
            {
                //obenter el proyecto
                var project = await _context.Projects.FindAsync(id);
                if (project == null)
                {
                    return NotFound();
                }
                //buscar entre las etapas del proyecto, la que en su estado este activa, debe ser solo una
                var stage = await _context.Stages.Where(s => s.IdProject == id && s.Status == 1).FirstOrDefaultAsync();
                if (stage == null)
                {
                    return NotFound();
                }
                //buscar cual substage de la etapa esta activo
                var substage = await _context.Substages.Where(s => s.IdStage == stage.Id && s.Status == 1).FirstOrDefaultAsync();
                if (substage == null)
                {
                    return NotFound();
                }
                //Cada Stage tiene 4 etapas y cada Substage tiene 6 subetapas.
                //cambiar el estado del substage a finalizado, y habilitar el siguiente substage a activo
                //i el substage es el ultimo de la etapa, se debe cambiar el estado de la etapa a finalizado
                //y habilitar la siguiente etapa a activo, y su primera estapa tambien debe estar activa

                substage.Status = 2;
                substage.UpdateDate = DateTime.Now;

                //activar el siguiente substage
                var nextSubstage = await _context.Substages.Where(s => s.IdStage == stage.Id && s.SubstageNumber == substage.SubstageNumber + 1).FirstOrDefaultAsync();
                if (nextSubstage != null)
                {
                    nextSubstage.Status = 1;
                    nextSubstage.UpdateDate = DateTime.Now;
                }
                else
                {
                    //si no hay siguiente substage, se debe cambiar el estado de la etapa a finalizado
                    stage.Status = 2;
                    stage.UpdateDate = DateTime.Now;

                    //activar la siguiente etapa
                    var nextStage = await _context.Stages.Where(s => s.IdProject == id && s.StageNumber == stage.StageNumber + 1).FirstOrDefaultAsync();
                    if (nextStage != null)
                    {
                        nextStage.Status = 1;
                        nextStage.UpdateDate = DateTime.Now;

                        //activar el primer substage de la siguiente etapa
                        var firstSubstage = await _context.Substages.Where(s => s.IdStage == nextStage.Id && s.SubstageNumber == 1).FirstOrDefaultAsync();
                        if (firstSubstage != null)
                        {
                            firstSubstage.Status = 1;
                            firstSubstage.UpdateDate = DateTime.Now;
                        }
                    }
                    else
                    {
                        //si no hay siguiente etapa, se debe cambiar el estado del proyecto a finalizado
                        project.Status = 2;
                        project.UpdateDate = DateTime.Now;

                    }
                }
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

    }
}

