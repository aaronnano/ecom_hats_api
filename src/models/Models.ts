// Models a desplegar y que manejara el Front

export class User {
    private id: number
    private uuid: number
    private name: string
    private username: string
    private email: string
    private avatar: string
    private addresses: any
    private orders: any

    constructor({ id, uuid, name, username, email, avatar, addresses, orders }: any){
        this.id = id
        this.uuid = uuid
        this.name = name
        this.username = username
        this.email = email
        this.avatar = avatar
        this.addresses = addresses?.map((add:any) => new Address(add))
        this.orders = orders?.map((order:any) => new Order(order))
    }
}
export class Address {
    private id: number
    private address_line: any
    private city: any
    private state: any
    private phone: any

    constructor({id, address_line, city, state, phone }:any){
        this.id = id
        this.address_line = address_line
        this.city = city
        this.state = state
        this.phone = phone
    }
}
export class Product {
    private id: number
    private title: string
    private description: string
    private image: string
    private price: number
    private colors: any
    private category: any

    constructor({ id, title, description, image, price, colors, category }: any){
        // Esto permite que no se recibe alguna field, y por lo tanto quede e.g. price: undefined
        // Y esta bien, porque al momento de pasarlo a JSON desaparece la field
        this.id = id
        this.title = title
        this.description = description
        this.image = image
        this.price = price
        this.colors = colors?.map(({ title }: any) => title )  // Solo los nombres de los colores. Puede ser undefined
        this.category = category?.name  // Puede ser undefined
    }
}

export class CartItem {
    private id: number
    private quantity: number
    private color: string
    private product: any
    // private user: any

    // Nota: si pongo en undefined algunas fields, el JSON no las considera
    constructor({ id, quantity, color, product }: any){
        this.id = id
        this.quantity = quantity
        this.color = color?.title
        this.product = {
            ...new Product(product),  // Puede que el product tenga colors: undefined, no lo pasaremos
        }
    }

}
export class Review {
    private id: number
    private createdAt: any
    private comment: string
    private user: any
    // private user: any

    // Nota: si pongo en undefined algunas fields, el JSON no las considera
    constructor({ id, createdAt, comment, user }: any){
        this.id = id
        this.createdAt = createdAt
        this.comment = comment
        this.user = {
            ... new User(user)

        }
    }
}

export class Order {
    private order_id: string
    private purchase_date: Date
    private delivery_date: Date
    private total: string
    private status: string
    private delivery_address: any
    private orderItems: any

    constructor({ order_id, purchase_date, delivery_date, total, status, delivery_address, orderItems }: any){
        this.order_id = order_id
        this.purchase_date = purchase_date
        this.delivery_date = delivery_date
        this.total = total
        this.status = status
        this.delivery_address = { ...new Address(delivery_address) }
        this.orderItems = orderItems.map((item: any) => {   // El model orderItem es identico a cartItem
            return { ...new CartItem(item) }
        })
    }

}