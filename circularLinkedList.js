// circularLinkedList.js

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

function printList(head) {
    if (head === null) {
        console.log("List is empty");
        return;
    }
    let current = head;
    do {
        console.log(current.value);
        current = current.next;
    } while (current !== head);
}

function DeleteLast(head) {
    if (head === null) {
        console.log("List is empty");
        return null;
    }

    let current = head;
    let previous = null;

    // If the list has only one node
    if (current.next === head) {
        return null;
    }

    // Traverse the list to find the last node
    while (current.next !== head) {
        previous = current;
        current = current.next;
    }

    // Remove the last node
    previous.next = head; // Update the previous node's next to head

    // If head was the last node
    if (head === current) {
        head = previous.next;
    }

    return head;
}

// Testing the function
let head = new Node(1);
let second = new Node(2);
let third = new Node(3);

head.next = second;
second.next = third;
third.next = head;

console.log("Original list:");
printList(head);

console.log("Head node value before deletion:", head.value);

head = DeleteLast(head);

console.log("List after deleting the last node:");
printList(head);

console.log("Head node value after deletion:", head ? head.value : "List is empty");