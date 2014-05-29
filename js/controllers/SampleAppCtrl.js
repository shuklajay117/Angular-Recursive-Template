sample_app.controller("SampleAppCtrl", ['$scope', function($scope) {
    
	// Variable Declaration
	$scope.items = [{name: "Item 1",isChecked:false,parentID:0, children: []},{name: "Item 2",parentID:1, children: []}];
	$scope.viewOptions = {
		isUncheckedVisible:false,
		isAllVisible:false
	};
	
	/**
	  * Description : Delete node who is not at root level. It will find child by recursive iterating all child and delete it.
	  * Date		: 27 Nov 2013
	  **/
	function removeChild(name,parent)
	{
		for(var pi=0;pi<parent.children.length;pi++)
		{
			if(parent.children[pi].name == name)
			{
				parent.children.splice(pi,1);
				break;
			}
			if(parent.children[pi].children.length != 0)
			{
				removeChild(name,parent.children[pi]);
			}
		}
	}
	
	/**
	  * Description : Bubbles up parent ID when any parent element removes from an array.
	  * Date		: 27 Nov 2013
	  **/
	function regenerateParentIDs(fromIndex)
	{
		for(var i=fromIndex;i<$scope.items.length;i++)
		{
			$scope.items[i].parentID -= 1;
		}
	}
	
	/**
	  * Description : Delete specific node, if its not a root element then pass it to function for deletion.
	  * Date		: 27 Nov 2013
	  **/
	$scope.deleteIt = function(data) {
		if(data.name == $scope.items[data.parentID].name) // It means its a parent
		{
			$scope.items.splice(data.parentID,1);
			regenerateParentIDs(data.parentID);
		}
		else
		{
			removeChild(data.name,$scope.items[data.parentID]);
		}
    };
	
	/**
	  * Description : Add parent node with temporary name. It generates its ID so that it helps while removing of child node faster.
	  * Date		: 27 Nov 2013
	  **/
	$scope.addParent = function() {
		var no_of_items = $scope.items.length;
		var newID = $scope.items.length;
		$scope.items.push({name:"Item " + (no_of_items+1),isChecked:false,parentID:newID,children:[]});
	}
	
	/**
	  * Description : Add child node with temporary name.
	  * Date		: 27 Nov 2013
	  **/
    $scope.add = function(data) {
        var post = data.children.length + 1;
        var newName = data.name + '.' + post;
        data.children.push({name: newName,isChecked:false,parentID:data.parentID,children: []});
    };
	
	/**
	  * Description : Show/hide All Menu option handling.
	  * Date		: 27 Nov 2013
	  **/
	$scope.toggleAllItems = function() {
		$scope.viewOptions.isAllVisible = !$scope.viewOptions.isAllVisible;
	}
	
	/**
	  * Description : Show/hide Unchecked Items Menu option handling.
	  * Date		: 27 Nov 2013
	  **/
	$scope.toggleUncheckedItems = function() {
		$scope.viewOptions.isUncheckedVisible = !$scope.viewOptions.isUncheckedVisible;
	}
}]);