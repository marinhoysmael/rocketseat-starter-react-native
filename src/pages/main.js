import React, {Component} from 'react';
import api from '../services/api';

import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'


export default class Main extends Component {

    static navigationOptions = {
        title: "JSHunt"
    }


    /**
     * Estado (state) é uma variavel (Objeto) que serve para armazenar toda e qualquer informação
     * que será manipulado dentro da classe. Todas as variaveis devem ficar dentro do Estado;
     * 
     * O react ouvindo o estado, e toda vez que houver uma alteração dentro de estado,
     * ele vai executar o render novamente;
     */
    state = {
        productInfo: {},
        docs: [],
        page: 1,
    };

    /**
     * método disparado automaticamente assim que o componente é montado em tela
     */
    
    componentDidMount(){
        this.loadProducts();
    }

    /**
     * para que as funções no react possa enxergar o this, é necessário cria-la
     * na forma de arrow function. Isso ocorre porque o arrow function não cria
     * um novo scopo de função, ele herda o scope de função acima dele
     */
    loadProducts = async (page = 1) =>{
        const response = await api.get(`/products?page=${page}`);

        const { docs, ... productInfo } = response.data;

        //1 this.setState é a forma como altero o state
        this.setState({
            docs:[... this.state.docs, ... docs],
            productInfo,
            page
        })
    };

    loadMore = () =>{
        const { page, productInfo } = this.state;

        if(page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    };

    renderItem = ({item}) => (
        <View style={styles.productContainer}> 
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>

            <TouchableOpacity 
                style={styles.productButton}
                onPress={()=>{
                    this.props.navigation.navigate("Product", {product: item});
                }}
            >
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity> 
        </View>
    )

    render(){

        return(
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fafafa'
    },

    list:{
        padding: 20
    },

    productContainer:{
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
    },

    productTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },

    productDescription:{
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24
    },

    productButton:{
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#DA552F',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 10
    },

    productButtonText:{
        fontSize: 16,
        color: '#DA552F',
        fontWeight: 'bold'
    },

});