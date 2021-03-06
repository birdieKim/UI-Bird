var Node = require('./node');

/**
 *
 * Create a doubly linked list
 *
 * @param {*} [data]
 *   The data to be inserted to the list
 */
var DoublyLinkedList = function(data) {
  this.head = null;
  this.tail = null;
  this.length = 0;

  if (data) {
    var node = new Node(data);
    this.head = node;
    this.tail = node;
    this.length++;
  }

};

DoublyLinkedList.prototype = Object.create(require('./linkedList').prototype);
DoublyLinkedList.prototype.constructor = DoublyLinkedList;

var _eventCallbacks = {};
var _canvasObjects = [];

DoublyLinkedList.prototype.addEventListener = function(eventName, callback) {
  // prevent unkown eventName
  if (_eventCallbacks[eventName] === undefined) {
    _eventCallbacks[eventName] = [];
  }

  _eventCallbacks[eventName].push(callback);
};

DoublyLinkedList.prototype.removeEventListener = function(eventName, callback) {
  var index = _eventCallbacks[eventName].indexOf(callback);

  if (index !== -1) {
    _eventCallbacks[eventName].splice(index, 1);
  }
};

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

  if (this.length === 0) {
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
  var insertedNode = new Node(data);
  var iterater = this.head;

  if (index === this.length) {
    return this.addLast(data);
  } else if (index >= 0 && index < this.length) {
    for (var i = 0; i < index - 1; i++) {
      iterater = iterater.next;
    }
    insertedNode.previous = iterater;
    insertedNode.next = iterater.next;
    iterater.next.previous = insertedNode;
    iterater.next = insertedNode;
    this.length++;
    return insertedNode;
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
 *   If the list is empty or the index in not a valid number,
 *   return undefined
 */
DoublyLinkedList.prototype.searchNodeAt = function(index) {
  var iterater;

  if (index >= 0 && index < this.length) {
    if (index < this.length / 2) {
      iterater = this.head;
      for (var i = 0; i < index; i++) {
        iterater = iterater.next;
      }
    } else {
      iterater = this.tail;
      for (var i = this.length - 1; i > index; i--) {
        iterater = iterater.previous;
      }
    }
    return iterater;
  } else {
    console.warn('The list is empty or the index you passed in is not valid.');
    return undefined;
  }
};

module.exports = DoublyLinkedList;
