import { AuthorHeader } from "./components/AuthorHeader"
import { FleetMap } from "./components/FleetMap"
import { VehiclesGrid } from "./components/VehiclesGrid"
import { VehicleToolbar } from "./components/VehicleToolbar"

function App() {
  return (
    <main>
      <AuthorHeader fullName="Dynylson Júnior" />
      <div className="mx-11 mt-7">
        <VehicleToolbar />
        <FleetMap />
        <VehiclesGrid />
      </div>
    </main>
  )
}

export default App
