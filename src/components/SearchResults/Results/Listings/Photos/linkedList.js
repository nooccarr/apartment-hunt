class Node {
  constructor() {
    this.next = null;
    this.prev = null;
    this.value = null;
  }
}

class PhotosLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    // this.length = 0;
  }

  addNode(_value) {
    const node = new Node();
    node.value = _value;

    if (!this.head) {
      this.head = node;
      this.head.prev = this.head;
      this.head.next = this.head;
      this.tail = node;
      this.tail.prev = this.head;
      this.tail.next = this.head;
      // this.length++;
      return;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
    this.tail.next = this.head;
    this.head.prev = this.tail;
    // this.length++;
    return;
  }
}

module.exports = PhotosLinkedList;