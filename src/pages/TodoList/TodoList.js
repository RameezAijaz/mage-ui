import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Layout from "../../base_template/Layout/Layout";
import { ContentList } from "../../common/ContentList/ContentList";


class TodoList extends React.Component {
    constructor(props){
        super(props);
        this.state = {todoListItems:['eat', 'sleep', 'code'], item:''};
    }
    removeItem(key){
        this.setState((prevState)=>{
            let items = prevState.todoListItems;
            items.splice(key, 1);
            return {todoListItems: items}

        });
    }
    addItem(){
        if(!this.state.item)
            return;
        this.setState((prevState)=>{
            let items = prevState.todoListItems;
            items.push(prevState.item);
            return {todoListItems: items, item:''};
        });
    }
    render(){
        return(
            <Layout title="React setState TodoList Example"
                    detail='Add and remove items from TodoList using simple react setState' >
                <ContentList name="Todo List"
                             title="Todo List"
                             className="w-25"
                             data={this.state.todoListItems}
                             icon="times"
                             onClick={this.removeItem.bind(this)}
                />

                <InputGroup className="mb-3 w-25">
                    <FormControl
                        value={this.state.item}
                        placeholder="Task Name"
                        aria-label="Task Name"
                        aria-describedby="basic-addon2"
                        onChange={e=>this.setState({item:e.target.value})}
                    />
                    <InputGroup.Append>
                        <Button disabled={!this.state.item} variant="primary" onClick={this.addItem.bind(this)}>Add</Button>
                    </InputGroup.Append>
                </InputGroup>

            </Layout>)
    }

}

export default TodoList;
