import { createBrowserRouter } from 'react-router';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { MainScreen } from './components/MainScreen';
import { UpgradesScreen } from './components/UpgradesScreen';
import { RankingScreen } from './components/RankingScreen';
import { GameLayout } from './components/GameLayout';
import { AuthLayout } from './components/AuthLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: LoginScreen,
      },
      {
        path: 'login',
        Component: LoginScreen,
      },
      {
        path: 'cadastro',
        Component: RegisterScreen,
      },
    ],
  },
  {
    path: '/jogo',
    Component: GameLayout,
    children: [
      {
        index: true,
        Component: MainScreen,
      },
      {
        path: 'upgrades',
        Component: UpgradesScreen,
      },
      {
        path: 'ranking',
        Component: RankingScreen,
      },
    ],
  },
]);
