import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import "./assets/iconfont/iconfont.css"
import router from "./router/index"
import store from "./store/index"
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { StarOutlined, StarFilled, StarTwoTone, AppstoreOutlined, MailOutlined, PieChartOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import {
    Button,
    Avatar,
    InputSearch,
    Image,
    Input,
    Textarea,
    Form,
    FormItem,
    InputPassword,
    Checkbox,
    Layout,
    LayoutHeader,
    Menu,
    MenuItem,
    SubMenu,
    LayoutSider,
    Breadcrumb,
    LayoutContent,
    Card,
    BreadcrumbItem,
    Table,
    DatePicker,
    Modal,
    Switch,
    List,
    ListItem,
    ListItemMeta,
    Skeleton,
    Popconfirm,
    message
} from "ant-design-vue"
const app = createApp(App)

app.component(Button.name, Button)
app.component(Avatar.name, Avatar)
app.component(InputSearch.name, InputSearch)
app.component(Image.name, Image)
app.component(Input.name, Input)
app.component(Form.name, Form)
app.component(FormItem.name, FormItem)
app.component(InputPassword.name, InputPassword)
app.component(Checkbox.name, Checkbox)
app.component(UserOutlined.name, UserOutlined)
app.component(LaptopOutlined.name, LaptopOutlined)
app.component(NotificationOutlined.name, NotificationOutlined)
app.component(Layout.name, Layout)
app.component(LayoutHeader.name, LayoutHeader)
app.component(LayoutSider.name, LayoutSider)
app.component(LayoutContent.name, LayoutContent)
app.component(Menu.name, Menu)
app.component(MenuItem.name, MenuItem)
app.component(Breadcrumb.name, Breadcrumb)
app.component(SubMenu.name, SubMenu)
app.component(StarOutlined.name, StarOutlined)
app.component(AppstoreOutlined.name, AppstoreOutlined)
app.component(MailOutlined.name, MailOutlined)
app.component(PieChartOutlined.name, PieChartOutlined)
app.component(MenuUnfoldOutlined.name, MenuUnfoldOutlined)
app.component(MenuFoldOutlined.name, MenuFoldOutlined)
app.component(Card.name, Card)
app.component(BreadcrumbItem.name, BreadcrumbItem)
app.component(Table.name, Table)
app.component(DatePicker.name, DatePicker)
app.component(Modal.name, Modal)
app.component(Switch.name, Switch)
app.component(List.name, List)
app.component(ListItem.name, ListItem)
app.component(ListItemMeta.name, ListItemMeta)
app.component(Skeleton.name, Skeleton)
app.component(Popconfirm.name, Popconfirm)
app.use(router)
app.use(store)
app.mount('#app')
