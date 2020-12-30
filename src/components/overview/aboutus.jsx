import React from 'react';
import Navigation from './navigation.jsx';
import logo from '../../images/logo.png';
import image3 from '../../images/3.jpg';
 

class About extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (

      <div>
        <div className="navigation-bar">
          <Navigation/>
        </div>
        <div className="about-us-container">
        this is aboutus
        
        <div>
          <h2>Overview</h2>
          <p>Stunning Contemporary in the Murray Hill Estate area with dramatic street presence crafted by Scarsdale's most prestigious builder,  KOSL Building. Set on level, private .50 acre lot with room for a pool. Time to customize. Built with the highest quality materials and  craftsmanship, this five bedroom, five-and-a-half bathroom, 6,820 square feet, including a dramatic finished basement.  10' foot ceilings on the first floor, 9' foot ceilings on the second floor and lower level. Level back yard, room for pool (not included) and 2 car garage.</p>
          <h2>Facts and features</h2>
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
        </div>
        
        <div className="widget">
          <h5>Recommanded</h5>
            <a href="#"><img src={image3} /></a>
            <h4><a href="#">Consetetur sadipscing elitr nonumy</a></h4>
        </div>
  
      </div>
    </div>

    );
  }
}

export default About;
