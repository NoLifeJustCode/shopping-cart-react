import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from 'firebase'
class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: [
        
      ]
    }
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
    this.db=firebase
    .firestore()
  }
  componentDidMount(){
    // firebase
    // .firestore()
    // .collection('products')
    // .get()
    // .then((snapshot)=>{
    //   const products=snapshot.docs.map((doc)=>{
    //     const data=doc.data()
    //     data['id']=doc.id
    //     return data
    //   })
    //   this.setState(()=>{
    //     return {
    //       products:products
    //     }
    //   })
    // })
    this.db
    .collection('products')
    .onSnapshot((snapshot)=>{
      const products=snapshot.docs.map((doc)=>{
        const data=doc.data()
        data['id']=doc.id
        return data
      })
      this.setState(()=>{
        return {
          products:products
        }
      })
    })
  }
  addProduct=()=>{
      this.db
        .collection('products')
        .add({
          'img':'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIgAWgMBEQACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAAAQIFBwMEBgj/xAAuEAACAgECBAIJBQAAAAAAAAAAAQIDEQQFBgcSITFBExQiUWFxgaHBMjNikZL/xAAaAQEBAAMBAQAAAAAAAAAAAAAAAQIDBAUG/8QAJxEBAQACAQMCBgMBAAAAAAAAAAECEQMEEkEFITEyUWGR8CJxgRP/2gAMAwEAAhEDEQA/ANHgABVAAAAAAAAAAARAAVQABOCCCgAAAAAAiAAqgEpEGc4a2Szd3uM449Hodvv1Vjf8YNJf6a/o1cuVmpPNjbx4sJKODZtqs0qZAAAAABECgFAOStZZjVjafK7bnLhjjHU48dslUvqpP8I5cs5u/aO7jw12fetY6mHTY1jwOjC7jl5JrJ12ZtSCgAAACIACqIg5qvExrKN78qtMny14htS/chZH59Nefycdx3jyV3XLWfFP34tH65p3Sx7zp4/ljm5vnrpvxNrQgoAAAAiBQCiILxeCVY+i+UcfScp9ZFfqs9a+vbH4Oa54y5YeW223LG/vxfO9k+ru35HRJqMMru7cTMmCCgAAACIACqASQbb5T8VV7btPqeptSrdllTg329rDT+7PJ63h5JzTk45493o9PMOTh7Mrqy+zU1i6ZyjnPS2j1nnKFAAAAACIACqAem4J2HS79brq9ZZZBVVJ1uEsYk359n27HB13VZdPMbjPi7uh6XHqLlMvDL6Xl7uVcbsa7Ryws1KMpLM/LPs9jnvrHFNalb56Tye+7/WmOs5e8QqcUqqJ9Tw5RuWF8WbZ6r01838NV9M6ifT8vKzi4TlF+MXhnoz3m3BZq6VKgAIgVQiAAqgHq+AdW9JqNa08dVcV92eZ6lh344vY9Iuss/8AHtK94w33XieNene33L275KNUmn5DHppaXPU21BfZ6W6yzGOuTlj3ZZ9VjNSR8dnl3ZW/VQyYgAAAIgAKAVktk1Hq9ljzhyRy9Th3SO/oOTsyrNx1/fxOL/k9Sc6mp3B+il38jLDi92HJz/xryp6r58AAAAAiBQCgHJRLpk/kY5TbPjuq7Su8/M1drpnJ5Vsubi1kswYZ8tsdM3OYAAAAAAAAATF4ZKsckX2MWW1ZMqKGTEAAAAAAAAACC8X2ZGSrKiCoAAAAAAAAABBIACCgAAAAAAAAIAEgAIAFAAAAAABBIEAAAAoAAJIAABgABGQbABQILEUBpGAaMe4u00jHwA//2Q==',
          title:'candle',
          price:10,
          qty:10
        }).then((docRef)=>{
          console.log('ref of doc added',docRef)
        })
        .catch((err)=>{
          console.log(err)
        })
  }
  handleIncreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

   // products[index].qty += 1;

    const DocRef=this.db.collection('products').doc(products[index].id);
    console.log(DocRef)
    DocRef
    .update({
      qty:products[index].qty+1,
    })
    .then((docRef)=>{
      console.log('updated',docRef)

    })
    .catch((err)=>{
      console.log(err)
    })
  }
  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    const DocRef=this.db.collection('products').doc(products[index].id);
    console.log(DocRef)
    DocRef
    .update({
      qty:products[index].qty-1,
    })
    .then((docRef)=>{
      console.log('updated',docRef)

    })
    .catch((err)=>{
      console.log(err)
    })
  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter((item) => item.id !== id); // [{}]
    const DocRef=this.db.collection('products').doc(id);
    DocRef
    .delete()
    .then((docRef)=>{
      console.log('Deleted Successfully')

    })
    .catch((err)=>{
      console.log(err)
    })
  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price
    })

    return cartTotal;
  }
  render () {
    const { products } = this.state;
    console.log('render')
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct} >Add Product</button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={ {padding: 10, fontSize: 20} }>TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;
