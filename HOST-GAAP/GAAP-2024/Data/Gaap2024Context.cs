using System;
using System.Collections.Generic;
using GAAP_2024.Models;
using GAAP_2024.Models.Fix;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace GAAP_2024.Data;

public partial class Gaap2024Context : DbContext
{
    public Gaap2024Context()
    {
    }

    public Gaap2024Context(DbContextOptions<Gaap2024Context> options)
        : base(options)
    {
    }
    public async Task<int> ExecuteUspCreateProjectAsync(string projectId, char modality, int registerUser, int esUser, int tuUser)
    {
        var outputParam = new SqlParameter
        {
            ParameterName = "@InsertedRecords",
            SqlDbType = System.Data.SqlDbType.Int,
            Direction = System.Data.ParameterDirection.Output
        };

        await Database.ExecuteSqlRawAsync(
            "EXEC [dbo].[uspCreateProject] @ProjectID, @Modality, @RegisterUser, @ESUser, @TUUser, @InsertedRecords OUTPUT",
            new SqlParameter("@ProjectID", projectId),
            new SqlParameter("@Modality", modality),
            new SqlParameter("@RegisterUser", registerUser),
            new SqlParameter("@ESUser", esUser),
            new SqlParameter("@TUUser", tuUser),
            outputParam);

        return (int)outputParam.Value;
    }

    public async Task DeleteProjectAsync(string projectId)
    {
        await Database.ExecuteSqlRawAsync(
            "EXEC [dbo].[uspDeleteProject] @ProjectID",
            new SqlParameter("@ProjectID", projectId));
    }

    public virtual IEnumerable<StageFix> GetStageByIdProject(string projectId)
    {
        string query = $"SELECT * FROM Stage WHERE idProject = '{projectId}'";


        return StageFixes.FromSqlRaw(query);
    }

    public virtual IEnumerable<SubStageFix> GetSubStageByIdStage(int stageId)
    {
        string query = $"SELECT * FROM Substage WHERE idStage = {stageId}";

        return SubStageFixes.FromSqlRaw(query);
    }

    public virtual IEnumerable<Project> GetUserProjectByIdUser(int userId)
    {
        string query = $"SELECT p.* FROM Project p WHERE p.id IN (SELECT up.idProject FROM UserProject up WHERE up.idUser = '{userId}')";
        var result = Projects.FromSqlRaw(query);
        //cerrar conexion
        return result;

        //return UserProjectFixes.FromSqlRaw(query);
    }
    public DbSet<Observation> Observations { get; set; }

    public  DbSet<Phone> Phones { get; set; }

    public  DbSet<Project> Projects { get; set; }

    public  DbSet<Role> Roles { get; set; }

    public DbSet<Stage> Stages { get; set; }

    public  DbSet<Substage> Substages { get; set; }

    public  DbSet<User> Users { get; set; }

    public  DbSet<UserProject> UserProjects { get; set; }

    public  DbSet<UserRole> UserRoles { get; set; }

    public DbSet<StageFix> StageFixes { get; set; }

    public DbSet<SubStageFix> SubStageFixes { get; set; }

    public DbSet<UserProjectFix> UserProjectFixes { get; set; }

}
