//test


function TreeNode(id, title, parent) 
	{
		this.id = id;
		this.title = title;
		this.children = [];
	};
	
TreeNode.prototype.save = 
	function (id,title)
	{
		localStorage.setItem("id", JSON.stringify(this) );
	}

TreeNode.prototype.load= 
	function (id)
	{
		
	}


	
	
TreeNode.prototype.addNode = 
	function (id,title)
	{
		var newNode = new TreeNode(id,title);
		this.children.push(newNode); 
		return newNode ;
	}	

TreeNode.prototype.removeChild = 
	function (id)
	{
		for (index = 0; index < this.children.length; ++index) 
		{
			if(this.children.id == id)
			{
				this.children.splice(index, 1);
			};
		}
	}	
	
	
TreeNode.prototype.getNodes= 
	function ()
	{
		return this.children; 
	}	

TreeNode.prototype.setNodes= 
	function (children)
	{           
		for (index = 0; index < children.length; ++index) 
		{
                    node = children[index];
                    newNode = this.addNode(node.id, node.title, this);
                    newNode.setNodes(node.children);
		}
	}	



	
function TreeNodeContructor(id) 
{
	var root  = localStorage.getItem(id);
	
	newTree = new TreeNode(root.id, root.title, null);
	newTree.setNodes(root.children);

	return newTree;
	
}


function TreeNodeDisplayer (container)
{
	
}

TreeNodeDisplayer.toHtml = 
	function (node, container)
	{
		container.empty();
		container.append("<div id=\"node_title_"+node.id+">"+node.title+"</div>");
		container.append("<ul id=\"node_children_"+node.id+"\"></ul>");
		var children_container = container.find("#node_children_"+node.id);
		for (index = 0; index < node.children.length; ++index) 
		{
			var child = node.children[index];
			children_container.append("<li id=\"node"+child.id+"\"></li>");
			var child_container = children_container.find("#node"+child.id);
			this.toHtml(child, child_container);
		}
	}


function aaa()
	{
		var root = new TreeNode("root",  "Example", null);
		
		root.addNode("aaa", "Element #1");
		root.addNode("bbb", "Element #2");
		element3 = root.addNode("ccc", "Element #3");
		element3.addNode("ddd", "Child #1 of element #3");
		element3_1 = element3.addNode("ddd", "Child #1 of element #3");
		element3_1.addNode("ggg", "subchild");
		element3_1.addNode("hhh", "Another subchild");
		element3_1.addNode("eee", "another subchild");
		element3_2 = element3.addNode("eee", "Child #2 of element #3");
		element3_3.addNode("lll", "subchild");
		element3_3.addNode("mmm", "subchild");
		element3_3.addNode("nnn", "subchild");
		element3_3 = element3.addNode("fff", "Child #3 of element #3");
		element3_3.addNode("iii", "subchild");
		element3_3.addNode("jjj", "subchild");
		element3_3.addNode("kkk", "subchild");
		
	}

	
$(document).ready(aaa);
	