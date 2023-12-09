using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeSheetHrEmployeeApp.Context;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Models.DTO;
using TimeSheetHrEmployeeApp.Repositories;
using TimeSheetHrEmployeeApp.Services;

namespace TimeSheetHrEmployeeTesting
{
    public class ProfileServiceTest
    {
        IRepository<int, Profile> repository;
        [SetUp]
        public void Setup()
        {
            var dbOptions = new DbContextOptionsBuilder<TimeSheetHrEmployeeContext>()
                               .UseInMemoryDatabase("dbTestCustomer")//a database that gets created temp for testing purpose
                               .Options;
            TimeSheetHrEmployeeContext context = new TimeSheetHrEmployeeContext(dbOptions);
            repository = new ProfileRepository(context);
        }
        [Test]
        public void AddProfileTest()
        {
            IProfileService profileService = new ProfileService(repository);
            var profileDTO = new ProfileDTO
            {
                Username = "testUser",
                FirstName = "Test",
                LastName = "User",
                ContactNumber = "1234567890",
                JobTitle = "Tester",

            };

            // Act
            var result = profileService.AddProfile(profileDTO);

            // Assert
            Assert.IsTrue(result);

        }
        
    }
}
