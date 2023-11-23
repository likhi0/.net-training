using Microsoft.EntityFrameworkCore;
using TimeSheetHrEmployeeApp.Context;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Repositories;
using Microsoft.Extensions.Configuration;
using System.Text;
using TimeSheetHrEmployeeApp.Models.DTO;
using TimeSheetHrEmployeeApp.Services;

namespace TimeSheetHrEmployeeTesting
{
    public class UserServiceTest
    {
        IRepository<string, User> repository;
        [SetUp]
        public void Setup()
        {
            var dbOptions = new DbContextOptionsBuilder<TimeSheetHrEmployeeContext>()
                               .UseInMemoryDatabase("dbTestCustomer")//a database that gets created temp for testing purpose
                               .Options;
            TimeSheetHrEmployeeContext context = new TimeSheetHrEmployeeContext(dbOptions);
            repository = new UserRepository(context);
        }


        [Test]
        [TestCase("Hemanth@gmail.com","Hemanth123")]
        //[TestCase("Test", "test321")]
        public void LoginTest(string un, string pass)
        {

            //Arrange
            var appSettings = @"{""SceretKey"": ""Anything will work here this is just for testing""}";
            var configurationBuilder = new ConfigurationBuilder();
            configurationBuilder.AddJsonStream(new MemoryStream(Encoding.UTF8.GetBytes(appSettings)));
            var tokenService = new TokenService(configurationBuilder.Build());
            IUserService userService = new UserService(repository, tokenService);
            userService.Register(new UserDTO
            {
                Username = un,
                Password = pass,
                Role = "Employee"
            });
            //Action
            var resulut = userService.Login(new UserDTO { Username = "Hemanth@gmail.com", Password = "Hemanth123", Role = "Employee" });
            //Assert
            Assert.AreEqual("Hemanth@gmail.com", resulut.Username);
        }
    }
}