import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './components/Home';
import ListaVendas from './components/ListaVendas';
import NovaVenda from './components/NovaVenda';
import InsereProdutos from './components/InsereProdutos';
import { ContextProvider } from './components/ContextProvider';
import DetalhesVenda from './components/DetalhesVenda';

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
    <ContextProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Início" component={Home} />
          <Stack.Screen name="Lista Vendas" component={ListaVendas} />
          <Stack.Screen name="Detalhes Venda" component={DetalhesVenda} />
          <Stack.Screen name="Nova Venda" component={NovaVenda} />
          <Stack.Screen name="Produtos" component={InsereProdutos} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
