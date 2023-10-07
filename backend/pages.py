class Node: 
    #makes a linked list that is currently empty
    def __init__(self, data):
        self.data= data
        self.ref = None

class LinkedList: 
    def __init__(self):
        self.head = None


    #def get_data(self):
       # return self.data

    #def set_data(self, data):
        #self.data = data
 
    #def get_next(self):
       # return self.next
 
   #def set_next(self, next):
        #self.next = next

    def append(self, data): 
        new_node = Node(data)
        if self.head is None:
           self.head = new_node
        else:
           current_node = self.head
           while current_node.ref is not None:
                current_node = current_node.ref
                current_node.ref = new_node

    def display_list(self): 
        if self.head is None:
            print("linked list is empty")
        else:
            current_node = self.head
            while current_node is not None:
                print(current_node.data)
                current_node = current_node.ref
    
pages = LinkedList()
pages.append(1)
pages.display_list()
