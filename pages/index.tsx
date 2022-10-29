import type { NextPage } from 'next';
import dynamic from "next/dynamic";
import { ThemeProvider } from 'styled-components';
import { theme } from '@gnosis.pm/safe-react-components';

const App = dynamic(
  () => {
    return import("./App");
  },
  { ssr: false }
);

const Home: NextPage = () => (
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
)

export default Home