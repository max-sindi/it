/*
 * Based on views-exp-filter-hierarch-select.js by Tim Sherratt
 * Copyright 2012, Bit Circus http://www.bitcircus.co.uk
 * Released under the GPLv3 license
 * http://www.gnu.org/copyleft/gpl.html
 *
 * Modified by Gabriel Camby @ www.tagexpert.com
 */
(function ($) {
	Drupal.behaviors.filterHierarchySelect = {
		attach: function () {
			if($('#edit-tid').is(':visible'))
				convertSelectElement($('#edit-tid'));
			// go.
			function convertSelectElement(originalSelect) {
				// hide original list (which has depth)
				originalSelect.hide();
				// generate a graph of the objects
				var graph = createGraph(originalSelect.children());

				// create the appropriate number of select elements
				var selects = new Array();
				for (i = 0; i < graph.graphDepth; i++) {
					var select = $('<select />')
						.attr('id', 'select' + i)
						.addClass('form-select')
						.css('display', 'none');

					originalSelect.parent().append(select);
					selects.push(select);
				}

				// populate our first select appropriately and show it
				populateSelect(selects[0], graph);
				selects[0].show();

				// set up a listener
				selects[0].bind('change.select-0', function(){
					optionSelected(graph, selects, 0, originalSelect);
				});

				// set the inital selection is per originalSelect
				if (graph.initialSelection != null)
					initialSelection(graph.initialSelection, selects);
			}


			// recursively set the initial selection
			function initialSelection(node, selects) {
				if (node.root != true) {
					initialSelection(node.parent, selects);
					selects[node.depth - 1].val(node.value).attr('selected', 'selected');
					selects[node.depth - 1].trigger('change.select-' + (node.depth - 1));
				}
			}


			// what to do when an option is selected
			function optionSelected(parent, selects, selectIndex, originalSelect) {
				// convenience
				var select = selects[selectIndex];
				var childIndex = selectIndex + 1;
				var selectedOption = select.children(':selected');

				// set the value of the original select element
				setOriginalSelect(originalSelect, selectedOption.val());

				// hide all children selects and unbind their listeners
				for (var i = childIndex; i < selects.length; i++) {
					selects[i].hide();
					selects[i].empty();
					selects[i].unbind('.select-' + i);
				}

				// find the node selected
				for (var i = 0; i < parent.children.length; i++) {
					if (parent.children[i].value == selectedOption.val()) {
					var node = parent.children[i];

					// if the node has children populate a select, add a listener, and show it
					if (node.children.length > 0) {
						populateSelect(selects[childIndex], node);
						selects[childIndex].bind('change.select-' + childIndex, function(){
							optionSelected(node, selects, childIndex, originalSelect);
						});
						selects[childIndex].show();
					}
					break;
					}
				}
			}


			// populate a select using a node's children
			function populateSelect(select, parent) {
				select.append($('<option />')
					.html('---')
					.val(parent.value));

				for (var i = 0; i < parent.children.length; i++) {
					select.append($('<option />')
						.html(parent.children[i].title)
						.val(parent.children[i].value));
				}

			}


			// set the value of the original select element
			function setOriginalSelect(select, value) {
				select.val(value).attr('selected', 'selected');
			}


			// build a graph of the vocabulary
			function createGraph(options) {
				var root = {
					root : true,
					depth : 0,
					parent : null,
					children : new Array(),
					title : 'root',
					value : 'All',
					graphDepth : 0,
					initialSelection : null
				};

				var prev = root;
				// build a node for each option and attach it appropriately
				for (var i = 1; i < options.length; i++) {
					var option = $(options[i]);
					var depth = 1;
					var title = option.html();

					// strip the dashes, and remember how many there are as that
					// is the node's depth
					while (title.indexOf("-") == 0) {
						title = title.substring(1);
						depth++;
					}

					// keep track of how deep the graph goes
					if (depth > root.graphDepth)
						root.graphDepth = depth;

					var node = {
						root : false,
						depth : depth,
						children : new Array(),
						title : title,
						value : option.val()
					};

					var dDepth = depth - prev.depth;
					// decide where to put the new node
					// (there must be a simpler way of doing this)
					if (dDepth == 0) {
						node.parent = prev.parent;
						prev.parent.children.push(node);
					} else if (dDepth > 0){
						node.parent = prev;
						prev.children.push(node);
					} else {
						while (dDepth++ < 0) {
							prev = prev.parent;
						}
						node.parent = prev.parent;
						prev.parent.children.push(node);
					}

					// finally track which node is initally selected
					if (option.is(":selected"))
						root.initialSelection = node;
					prev = node;
				}
				return root;
			}
		}
	};
})(jQuery);