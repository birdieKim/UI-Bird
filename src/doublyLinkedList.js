var Node = require('./node');

var DoublyLinkedList = function() {
  this.tail = null;
};

DoublyLinkedList.prototype = Object.create(require('./linkedList').prototype);
DoublyLinkedList.prototype.constructor = DoublyLinkedList;


/**
 *
 * Add a node to the end of the list
 *
 * @param {*} data
 *   The data of the node to be added
 *
 * @return {Node}
 *   The new tail node
 */
DoublyLinkedList.prototype.addLast = function(data) {
  var node = new Node(data);

  if(this.length === 0) {
    this.head = node;
    this.tail = node;
  } else {
    node.previous = this.tail;
    node.next = null;
    this.tail.next = node;
    this.tail = node;
  }

  this.length++;

  return this.tail;
};

/**
 *
 * Insert a node to the list
 *
 * @param {*} data
 *   The data of the node to be inserted
 * @param {Number} index
 *   The index of where the node to be inserted (zero-based)
 *
 * @return {Node}
 *   The inserted node
 *   Return undefined, if the index is not a natural number (including 0)
 */
DoublyLinkedList.prototype.insert = function(data, index) {
  var inserted_node = new Node(data);
  var iterater = this.head;

  if(index === this.length) {
    return this.addLast(data);
  } else if(index >= 0 && index < this.length) {
    for(var i = 0; i < index-1; i++) {
      iterater = iterater.next;
    }
    inserted_node.previous = iterater;
    inserted_node.next = iterater.next;
    iterater.next.previous = inserted_node;
    iterater.next = inserted_node;
    this.length++;
    return inserted_node;
  }
};

/**
 *
 * Get the node from the position of the given index
 *
 * @param {Number} index
 *   The index of where the node to be removed (zero-based)
 *
 * @return {Node|undefined}
 *   Node at the position of the given index
 *   If the list is empty or
 *   the index is bigger than the length of the list or
 *   not a natural number (including 0),
 *   return undefined
 */
DoublyLinkedList.prototype.searchNodeAt = function(index) {
  var iterater;

  if(this.length === 0 || index > this.length || index < 0) {
    return undefined;
  } else {
    if(index < this.length/2) {
      iterater = this.head;
      for(var i = 0; i < index; i++) {
        iterater = iterater.next;
      }
    } else {
      iterater = this.tail;
      for(var i = this.length-1; i > index; i--) {
        iterater = iterater.previous;
      }
    }
    return iterater;
  }
};

module.exports = DoublyLinkedList;
