import { AuthorHeader } from './components/AuthorHeader';
import { FleetMap } from './components/FleetMap';
import { VehiclesGrid } from './components/VehiclesGrid';
import { VehicleToolbar } from './components/VehicleToolbar';
import { VehiclesProvider } from './contexts/VehiclesProvider';

function App() {
  return (
    <VehiclesProvider>
      <main>
        <AuthorHeader fullName="Dynylson Júnior" />
        <div className="mx-4 sm:mx-6 md:mx-11 mt-4 sm:mt-6 md:mt-7">
          <VehicleToolbar />
          <FleetMap />
          <VehiclesGrid />
        </div>
      </main>
    </VehiclesProvider>
  );
}

export default App;
