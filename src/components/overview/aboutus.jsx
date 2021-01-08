import React from 'react';



class About extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let userLoggin = {
      name: 'Lonnie567',
      email: 'Lonnie567@gmail.com',
      role: 'client'
    }

  // let userLoggin = {
  //     name: 'laura90',
  //     email: 'laura90@gmail.com',
  //     role: 'agent'
  //   }

    return (
      <div>

          {/* <Navigation userLoggin={userLoggin}/> */}

        <div className='about-us-container'>

          <div className='aboutus-text-container'>
            <div>
              <h2>Overview</h2>
              <p>Hack Reactor’s top coding bootcamps are now taught at Galvanize campuses in Austin, Boulder, Denver, Los Angeles, New York, Phoenix, San Francisco, and Seattle (as well as online). Galvanize campuses are unique technology ecosystems designed to support your learning journey while providing access to professional mentorship, unparalleled networking opportunities, industry-related events, and growing startups all in one building.</p>
              <h2>Events and features</h2>
              <p>Appliances: Dryer, Refrigerator, Dishwasher, Washer, Microwave, Wine Cooler
                  Basement: Finished, Full
                  Cooling: Central Air
                  FireplaceYN: 1
                  Inclusions: Dryer, Dishwasher, Refrigerator, Washer, Alarm System, Garage Door Opener, Microwave, Second Dishwasher, Screens, Energy Star Appliance(s), Wine Cooler
                  PropertyType: Residential
                  PatioAndPorchFeatures: Patio
                  Sewer: Sewer
                  WaterSource: PublicSeniorCommunityYN: 0
                  Heating: Natural Gas, Hydro Air
                  ParkingFeatures: Attached
                  ConstructionMaterials: Stucco, Other, Advanced Framing Technique
                  ArchitecturalStyle: Contemporary
                  WindowFeatures: ENERGY STAR Qualified Windows
                  LotFeatures: Level, Near Public Transit
                  RoadResponsibility: Public Maintained Road
                  AtticDescription: Full, Pull Stairs
                  InteriorFeatures: Powder Room, Walk-In Closet(s), Formal Dining Room
                  CommunityFeatures: Park
                  HotWater: Gas Stand Alone
                  Village: Scarsdale</p>
                  <h2>Contact information</h2>
                  <p>Galvanize New York is situated in the Financial District, where it neighbors City Hall Park and the offices of major financial institutions. This campus does not offer membership opportunities at this time.
                    Email: newyork@galvanize.com
                    Phone: (212) 658-1791
                    Address: 109 Nassau Street, 4th Floor New York NY 10038</p>
              </div>
          </div>


        </div>
      </div>

    );
  }
}

export default About;
