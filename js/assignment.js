//test


var root = null;
var displayer = null;


function TreeNode(id, title, parent) 
	{
		this.id = id;
		this.title = title;
		if(parent != null)
		{
			this.parent_id= parent.id;
		}
		else
		{
			this.parent_id = null;
		}
		this.children = [];
	};
	
TreeNode.prototype.save = 
	function (id,title)
	{
		localStorage.setItem("id", JSON.stringify(this) );
	}

TreeNode.prototype.getNodeById= 
	function (id)
	{
		if(this.id == id)
		{
			return this;
		}
		else
		{
			for (var index = 0; index < this.children.length; ++index) 
			{
				var child = this.children[index];
				var result = child.getNodeById(id);
				if( result != null)
				{
					return result;
				}
			}
		}
		
		return null;
	}
	
	
TreeNode.prototype.addNode = 
	function (id,title)
	{
		var newNode = new TreeNode(id,title, this);
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
		for (var index = 0; index < children.length; ++index) 
		{
                    var node = children[index];
                    var newNode = this.addNode(node.id, node.title, this);
                    newNode.setNodes(node.children);
		}
	}	



	
function TreeNodeContructor(id) 
{
	var mainNode = localStorage.getItem(id);
	
	newTree = new TreeNode(mainNode.id, mainNode.title, null);
	newTree.setNodes(mainNode.children);

	return newTree;
}


function TreeNodeDisplayer (container)
{
	
}

TreeNodeDisplayer.prototype.toHtml = function (node, container)
	{
		container.empty();
		container.append("<div id=\"node_title_"+node.id+"\">"+node.title+"<input type=\"button\" class=\"button-add\" value=\"+\" data-id=\""+node.id+"\" /><input type=\"button\"  class=\"button-remove\"  value=\"-\" data-id=\""+node.id+"\" /></div>");
		container.append("<ul id=\"node_children_"+node.id+"\"></ul>");
		var children_container = container.find("#node_children_"+node.id);
		for (var index = 0; index < node.children.length; ++index) 
		{
			var child = node.children[index];
			children_container.append("<li id=\"node_"+child.id+"\"></li>");
			var child_container = children_container.find("#node_"+child.id);
			this.toHtml(child, child_container);
		}
	}

function prepareAddRemoveNode()
	{
		$("input.button-add")
			.click(
					function()
					{
						var button = $(this);
						id=button.data("id");
						var node = root.getNodeById(id);
						
						var new_id = prompt("id", "");
						var new_title = prompt("title", "");
						
						node.addNode(new_id, new_title);
												
						displayer.toHtml(node, $("#node_"+id));
						
					}
				)
		;

		$("input.button-remove")
			.click(
					function()
					{
						var button = $(this);
						id=button.data("id");
						var node = root.getNodeById(id);
						
						if(node.parent_id != null)
						{
							parent = root.getNodeById(node.parent_id);
							
							parent.removeChild(node.id);
													
							displayer.toHtml(root, $("#node_"+id));
						}
					}
				)
		;
		$("input.button-save")
			.click(
					function()
					{
						root.save();
					}
				)
		;
		$("input.button-load")
			.click(
					function()
					{
						root = new TreeNodeContructor("root");
					}
				)
		;
	}
	
	
function aaa()
	{
		root = new TreeNode("root",  "Example", null);
		
		
		root.addNode("0_1", "Element #1");
		root.addNode("0_2", "Element #2");
		
		element3 = root.addNode("0_3", "Element #3");
		
		element3_1 = element3.addNode("0_3_1", "Child #1 of element #3");
		element3_1.addNode("0_3_1_1", "subchild");
		element3_1.addNode("0_3_1_2", "Another subchild");
		element3_1.addNode("0_3_1_3", "another subchild");
		
                element3_2 = element3.addNode("0_3_2", "Child #2 of element #3");
		element3_2.addNode("0_3_2_1", "subchild");
		element3_2.addNode("0_3_2_2", "subchild");
		element3_2.addNode("0_3_2_3", "subchild");
		
		element3_3 = element3.addNode("0_3_3", "Child #3 of element #3");
		element3_3.addNode("0_3_3_1", "subchild");
		element3_3.addNode("0_3_3_2", "subchild");
		element3_3.addNode("0_3_3_3", "subchild");
		
		
		var displayer = new TreeNodeDisplayer();
		displayer.toHtml(root, $("#container"));


		prepareAddRemoveNode();

	}

	
$(document).ready(aaa);
	