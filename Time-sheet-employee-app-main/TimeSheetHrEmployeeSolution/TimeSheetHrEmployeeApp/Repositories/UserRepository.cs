using TimeSheetHrEmployeeApp.Context;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using Microsoft.EntityFrameworkCore;
namespace TimeSheetHrEmployeeApp.Repositories
{
    public class UserRepository : IRepository<string, User>
    {
        private readonly TimeSheetHrEmployeeContext _context;

        public UserRepository(TimeSheetHrEmployeeContext context)
        {
            _context = context;
        }
        /// <summary>
        /// add the user
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public User Add(User entity)
        {
            _context.Users.Add(entity);
            _context.SaveChanges();
            return entity;
        }
        /// <summary>
        /// delete 
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>

        public User Delete(string key)
        {
            var user = GetById(key);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
                return user;
            }
            return null;
        }

        public IList<User> GetAll()
        {
            if (_context.Users.Count() == 0)
                return null;
            return _context.Users.ToList();
        }

        public User GetById(string key)
        {
            var user = _context.Users.SingleOrDefault(u => u.Username == key);
            return user;
        }

        public User Update(User entity)
        {
            var user = GetById(entity.Username);
            if (user != null)
            {
                _context.Entry<User>(user).State = EntityState.Modified;
                _context.SaveChanges();
                return user;
            }
            return null;
        }
    }
}
