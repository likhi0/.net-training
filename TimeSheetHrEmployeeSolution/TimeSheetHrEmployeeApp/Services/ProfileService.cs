using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Models.DTO;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Models.DTO;
using TimeSheetHrEmployeeApp.Exceptions;

namespace TimeSheetHrEmployeeApp.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IRepository<int, Profile> _profileRepository;

        public ProfileService(IRepository<int, Profile> profileRepository)
        {
            _profileRepository = profileRepository;
        }

        public bool AddProfile(ProfileDTO profileDTO)
        {
            
            var profile = new Profile
            {
                Username = profileDTO.Username,
                FirstName = profileDTO.FirstName,
                LastName = profileDTO.LastName,
                ContactNumber = profileDTO.ContactNumber,
                JobTitle = profileDTO.JobTitle,
                Picture = profileDTO.Picture
            };

           
            var result = _profileRepository.Add(profile);

            if (result != null)
            {
                
                return true;
            }

            return false ;
        }

        public ProfileDTO UpdateProfile(ProfileDTO profileDTO)
        {
           
            var existingProfile = _profileRepository.GetById(profileDTO.ProfileId);

            existingProfile.Username = profileDTO.Username;
            existingProfile.FirstName = profileDTO.FirstName;
            existingProfile.LastName = profileDTO.LastName;
            existingProfile.ContactNumber = profileDTO.ContactNumber;
            existingProfile.JobTitle = profileDTO.JobTitle;
            existingProfile.Picture = profileDTO.Picture;

            var result = _profileRepository.Update(existingProfile);

            if (result != null)
            {
                
                return profileDTO;
            }

            return null;
        }

        public ProfileDTO DeleteProfile(ProfileDTO profileDTO)
        {
            var existingProfile = _profileRepository.GetById(profileDTO.ProfileId);
           // int ProfiletId = profileDTO.ProfileId;

            if (existingProfile != null)
            { 
                throw new NoProfileFoundException();
            }

            var result = _profileRepository.Delete(existingProfile.ProfileId);

            if (result != null)
            {
                
                return profileDTO;
            }

            return null;
        }
    }
}
