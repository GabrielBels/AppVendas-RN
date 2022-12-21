import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './components/Home';
import ListaVendas from './components/ListaVendas';
import NovaVenda from './components/NovaVenda';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Início" component={Home} />
          <Stack.Screen name="Lista Vendas" component={ListaVendas} />
          <Stack.Screen name="Nova Venda" component={NovaVenda} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
