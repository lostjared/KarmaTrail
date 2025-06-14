// This file contains the C++ code that is being described on the web page.

#include<iostream>
#include<string>
#include<algorithm>
#include "per.hpp"

class Escape {};

std::string give() {
    std::string data;
    std::cout << "Enter: ";
    std::getline(std::cin, data);
    return data;
}

std::string get(std::string data) {
    if(data == "love")
        std::cout << "love sent...\n";
    else if(data == "fear")
        std::cout << "fear sent...\n";
    else if(data == "break")
        throw Escape();
    
    return data;
}

int main() {
    try {
        per::Per<std::string, per::StringData> trail("karma_trail.txt", "");
        while(1) {
            *trail += get(give()) + "\n";
            std::cout << "karma trail: " << *trail << "\n";
        }
    }
    catch(Escape &e) {
        std::cout << "freedom..\n";
    }
    return 0;
}