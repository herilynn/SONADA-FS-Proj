import React from "react";
import { Route, Switch } from "react-router-dom";
// import SignupFormModal from "./components/SignupFormModal";
import Navigation from "./components/Navigation";
import Hello from "./components/loggedOutScreen/loggedOutScreen";
import GroupIndex from "./components/GroupIndex/GroupIndex";
import GroupShow from "./components/GroupIndex/GroupsShowPage";
import SearchResults from "./components/Search/SearchResults";
import Footer from "./components/Footer/footer";
// import GroupForm from "./components/GroupForm/GroupForm";

function App() {
  return (
    <>
      <Navigation />
      {/* <GroupIndex /> */}
        <Switch>
        <Route exact path="/searchresults">
          <SearchResults/>
        </Route>

          <Route exact path = '/groups'>
          
            <GroupIndex/>
            {/* <GroupForm/> */}
          </Route>

          <Route exact path = '/groups/:groupId'>
            <GroupShow/>
          </Route>
          {/* <Route path="/signup">
            <SignupFormModal />
          </Route> */}
        </Switch>
        <Footer/>
    </>
  );
}

export default App;