using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;
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
    public class TimeSheetServiceTest
    {
        IRepository<int, TimeSheet> repository;
        [SetUp]
        public void Setup()
        {
            var dbOptions = new DbContextOptionsBuilder<TimeSheetHrEmployeeContext>()
                               .UseInMemoryDatabase("dbTestCustomer")//a database that gets created temp for testing purpose
                               .Options;
            TimeSheetHrEmployeeContext context = new TimeSheetHrEmployeeContext(dbOptions);
            repository = new TimeSheetRepository(context);
        }
        [Test]
        public void AddTimeSheetTest()
        {
            ITimeSheetService timeSheetService = new TimeSheetService(repository);
            var timeSheet = new TimeSheet
            {
                Username = "testUser",
                Period = "Daily",
                HoursWorked = 40.5,
                OverTime = 5.5,
                Comments = "Test comments"
            };

            // Act
            var result = timeSheetService.AddTimeSheet(timeSheet);

            // Assert
            Assert.IsTrue(result);
        }
        



    }
}

