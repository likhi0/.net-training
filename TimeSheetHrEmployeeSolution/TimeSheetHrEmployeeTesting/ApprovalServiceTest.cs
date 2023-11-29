using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeSheetHrEmployeeApp.Context;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Repositories;
using TimeSheetHrEmployeeApp.Services;

namespace TimeSheetHrEmployeeTesting
{
    public class ApprovalServiceTest
    {
        IRepository<int, Approval> repository;
        [SetUp]
        public void Setup()
        {
            var dbOptions = new DbContextOptionsBuilder<TimeSheetHrEmployeeContext>()
                               .UseInMemoryDatabase("dbTestCustomer")//a database that gets created temp for testing purpose
                               .Options;
            TimeSheetHrEmployeeContext context = new TimeSheetHrEmployeeContext(dbOptions);
            repository = new ApprovalRepository(context);
        }
        [Test]
        public void AddApproval()
        {
            IApprovalService approvalService = new ApprovalService(repository);
            var Approval = new Approval
            {
                Approvedby = "jhon",
                AprrovedDate = DateTime.Now.AddDays(1),
                Status = "Approved",
                Comment = "No"
            };
            var result = approvalService.AddApproval(Approval);

            // Assert
            Assert.IsTrue(result);
        }
    }
}
