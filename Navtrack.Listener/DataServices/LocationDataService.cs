using System.Collections.Generic;
using System.Threading.Tasks;
using Navtrack.DataAccess.Model;
using Navtrack.DataAccess.Repository;
using Navtrack.Library.DI;

namespace Navtrack.Listener.DataServices
{
    [Service(typeof(ILocationDataService))]
    public class LocationDataService : ILocationDataService
    {
        private readonly IRepository repository;

        public LocationDataService(IRepository repository)
        {
            this.repository = repository;
        }

        public async Task Add(LocationEntity location)
        {
            using IUnitOfWork unitOfWork = repository.CreateUnitOfWork();
            
            unitOfWork.Add(location);

            await unitOfWork.SaveChanges();
        }

        public async Task AddRange(IEnumerable<LocationEntity> locations)
        {
            using IUnitOfWork unitOfWork = repository.CreateUnitOfWork();
            
            unitOfWork.AddRange(locations);

            await unitOfWork.SaveChanges();
        }
    }
}