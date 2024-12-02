using GAAP_2024.Data;
using GAAP_2024.Models;

namespace GAAP_2024.Servicio
{
    public class ProjectService
    {
        private readonly Gaap2024Context _context;

        public ProjectService(Gaap2024Context context)
        {
            _context = context;
        }

        public IEnumerable<Observation> GetObservationsByStageAndSubstage(string projectId, int stageNumber, int substageNumber)
        {
            return _context.GetObservationsByProjectStageSubstage(projectId, stageNumber, substageNumber);
        }
    }

}
